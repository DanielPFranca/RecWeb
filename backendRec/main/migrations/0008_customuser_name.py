# Generated by Django 5.0.3 on 2024-06-11 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_invoice_emissiondate'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]
