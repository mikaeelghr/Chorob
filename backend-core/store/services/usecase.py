from elasticsearch_dsl import Q

from store.services.documents import ProductDocument
from store.serializers.dtos import ProductListQuery
from store.models import Category, BaseProduct, Product, ProductHistory


def find_phrase_score(phr, name: str, features: dict):
    score = 0
    if name.find(phr) != -1:
        score += 10

    for key in features:
        if key != 'general_features' and key in features and features.get(key) is not None and features.get(key).find(
                phr) != -1:
            score += 3
    return score


def calculate_score(category, name: str, features: dict):
    score = 10 * find_phrase_score(category.name, name, features)

    for word in category.related_words:
        if name.find(category.name) != -1:
            score += int(category.related_words.get(word)) * find_phrase_score(word, name, features)
    return score


def suggest_category(name: str, features: dict):
    categories = Category.objects.filter(is_leaf=True)

    max_score, best_id = None, None
    for category in categories:
        score = calculate_score(category, name, features)
        if max_score is None or score > max_score:
            max_score, best_id = score, category.id
    return best_id


def suggest_base_product(name: str, features: dict, category_id, price):
    query = ProductListQuery({
        'price__gt': price * 0.7,
        'price__lt': price * 1.3,
        'category_id': category_id,
    })
    query.filters.append(('fuzzy', {'name': {"value": name}}))

    products = ProductDocument.create_query(query).execute()
    return products[0].uid


def get_or_select_base_product(name: str, category_id, features: dict, price):
    x = [t for t in BaseProduct.objects.filter(name=name)]
    if len(x) > 0:
        return x[0]
    print(name, category_id, price)
    product = run_query(name, price * 1.3, price * 0.7)
    if product is not None:
        return product

    category = [c for c in Category.objects.filter(id=category_id)][0]
    return BaseProduct.objects.create(name=name, category=category)


def run_query(query: str, price__lt, price__gt):
    best_score, best_base_product = 17, None
    for base_product in BaseProduct.objects.all():
        score = find_phrase_score(query, base_product.name)
        if score > 0:
            products = Product.objects.filter(base_product=base_product)
            if len(products) == 0:
                continue
            product = ProductHistory.get_best_product(base_product)
            last_history = ProductHistory.get_last_history(product)
            for p in products:
                score += find_phrase_score(query, p.name, p.features)
            score /= len(products) + 1
            if price__lt <= last_history.price <= price__gt:
                score += 10
            if score > best_score:
                best_score, best_base_product = score, base_product
    return best_base_product
