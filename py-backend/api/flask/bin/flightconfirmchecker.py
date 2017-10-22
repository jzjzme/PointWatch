#flightconfirmchecker.py

#Double checks flight confirmation number before approving transaction, afterwards then money can go through /transaction

import sys
import psycopg2
import urllib
import requests
import json
import re
import time
import xmltodict
import csv
from urllib.request import urlopen
import unittest
import urllib
import csv
from urllib.request import urlopen
from urllib.error import URLError, HTTPError
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException   

nomessage = "invalid confirmation number"


def check(xpath):
    try:
        driver.find_element_by_xpath(xpath)
    except NoSuchElementException:
        return False
    return True

def css(css):
	try:
		driver.find_element_by_css_selector(css)
	except NoSuchElementException:
		return False
	return True

def tags(tagname):
	try:
		driver.find_element_by_tag_name('h5')
	except NoSuchElementException:
		return False
	return True

def search(word):
	try:
		driver.find_element_by_link_text('%s'%word)
	except NoSuchElementException:
		return False
	return True

def confirmation(carrier, firstname, lastname, confirmation_num): #confirms flight number by inputing in airliners webpage checker, delta used for example

	driver = webdriver.chrome()
	if carrier = "delta":
		driver.get("https://www.delta.com/mytrips/")
		driver.findElement(By.xpath("//*[@id="myTripsConfFName"]")).sendKeys(firstname)
		driver.findElement(By.xpath("//*[@id="myTripsConfLName"]")).sendKeys(lastname)
		driver.findElement(By.xpath("//*[@id="myTripsConfNo"]")).sendKeys(confirmation_num)
		confirm = driver.find_element_by_link_text(u'FIND MY TRIP')
		confirm.click()

		if(driver.getPageSource().contains("Whoops! We're sorry, we could not find any reservation with the information you have provided. Please check your documentation and try again."))
			{
			    print(nomessage)
			    return False
			}

			else
			{
			    print("confirmed")
			    return True
			}



	else 
		print(nomessage)
		return False



