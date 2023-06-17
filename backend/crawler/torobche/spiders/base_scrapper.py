import json
from abc import ABC, abstractmethod

import requests
import scrapy

from crawler.torobche.items import Product


class BaseScrapper(scrapy.Spider, ABC):
    name = "base-scrapper"
    shop_domain = ""
    allowed_domains = []

    def start_requests(self):
        for i in range(2, 5):
            yield scrapy.Request(
                self._format_url(i),
                self.parse
            )

    def _format_url(self, index):
        return self.base_url.format(page_number=index)

    def parse(self, response):
        items = self._get_items(response)
        for item in items:
            product = Product()
            product['name'] = self._get_title_from_item(item).strip()
            product['image_url'] = self._get_image_url(item).strip()
            product['page_url'] = self._get_url(item).strip()
            product['price'] = self._get_cost(item)
            if isinstance(product['price'], str):
                product['price'] = int(product['price'].replace(',', ''))
            product['is_available'] = self._get_activeness_status(item)
            product['shop_domain'] = self.shop_domain
            xx = scrapy.Request(
                product['page_url'],
                callback=self._parse_product_page,
                cb_kwargs=dict(product=product)
            )
            yield xx

    @abstractmethod
    def _get_items(self, response):
        pass

    @abstractmethod
    def _get_title_from_item(self, item):
        pass

    @abstractmethod
    def _get_image_url(self, item):
        pass

    @abstractmethod
    def _get_url(self, item):
        pass

    @abstractmethod
    def _get_cost(self, item):
        pass

    def _get_activeness_status(self, item):
        return True

    def _parse_product_page(self, response, product):
        product['features'] = json.dumps(self._extract_features(response, product))
        print('wferdtret', json.dumps(dict(**product)))
        ss = requests.post('http://0.0.0.0:8086/product/create-or-update', data=dict(**product))
        print('wfegrtyu', ss)
        yield product

    def _extract_features(self, response, product):
        return dict()
