from apscheduler.schedulers.background import BackgroundScheduler
from .models import *
from django.utils import timezone
import pandas as pd


def ProductScheduler():
    scheduler = BackgroundScheduler()
    scheduler.remove_all_jobs()
    scheduler.add_job(JobProduct, 'interval', seconds=2)
    scheduler.start()


def JobProduct():
    print('Running job')
    product = ProductFiles.objects.filter(fileRead=False)
    for prod in product:
        file = pd.read_excel(prod.file.path)
        for index, row in file.iterrows():
            if row['Name'] is not None and row['categoryFK'] is not None and row['weight'] is not None and row['description'] is not None and row['barCode'] is not None and row['image'] is not None:
                category = ProductCategory.objects.get(name=row['categoryFK'])
                Product.objects.create(name=row['Name'],categoryFK=category,weight=row['weight'],description=row['description'],barCode=row['barCode'],image=row['image'])
        prod.fileRead = True
        prod.save()