from crawler.torobche.spiders.base_scrapper import BaseScrapper



class MacbookiranSpider(BaseScrapper):
    name = "macbookiran-scrapper"
    shop_domain = "macbookiran.com"
    base_url = "https://macbookiran.com/page/{page_number}/?s&post_type=product&cat_id"
    allowed_domains = ["https://macbookiran.com/", "macbookiran.com"]

    def _get_cost(self, item):
        try:
            return item.css('bdi::text').extract()[0][:-1]
        except Exception as e:
            return -1

    def _get_image_url(self, item):
        return item.css('.product-image').css('.lazy::attr(src)').extract()[0]

    def _get_url(self, item):
        return item.css('.product-image::attr(href)').extract()[0]

    def _get_title_from_item(self, item):
        return item.css('.woocommerce-loop-product__title::text').extract()[0]

    def _get_items(self, response):
        return response.css(".product-type-simple")

    def _extract_features(self, response, product):
        keys = response.css('.attribute_name::text').extract()
        values = response.css('.attribute_value > p::text').extract()
        return {keys[i].strip(): values[i].strip() for i in range(min(len(keys), len(values)))} if len(keys) > 0 else dict()
