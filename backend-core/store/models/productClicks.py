from django.db import models

from core.models import BaseAccount
from store.models import Product
from store.services.utils import generate_uid


class ProductClicks(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="clicks")
    user = models.ForeignKey(BaseAccount, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
