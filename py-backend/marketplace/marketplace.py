# marketplace.py
# This sends all transactions to postgres database for pts.
import sys
import psycopg2

conn = psycopg2.connect(database="marketplace", user="bwonymph") #enter database


def sellpts(user, amount):
	cur = conn.cursor()
	sql = """INSERT INTO users(user) VALUES(amount) """
	cur.execute(sql, user, amount)
	conn.commit()

def howmanypts(users):
	cur = conn.cursor()
	sql = """SELECT FROM amount FROM users(user)"""
	cur.execute(sql, user)
	pts = cur.fetchone()
	conn.commit()
	return pts

def list_transaction(user, user2, amount, type, transaction_id):
	cur = conn.cursor()
	sql = """INSERT INTO transactions(transaction_id) VALUES(user,user2,amount,type)"""
	cur.execute(sql, user, user2, amount, type, transaction_id)
	conn.commit()


def complete_transaction(transaction_id):
	cur = conn.cursor()
	sql = "SELECT user FROM transaction_id FROM transactions"
	cur.execute(sql, transaction_id)
	user1 = cur.fetchone()
	sql = "SELECT user2 FROM transaction_id FROM transactions"
	cur.(sql, transaction_id)
	user1 = cur.fetchone()
	sql = "SELECT cash FROM transaction_id FROM transactions"
	cur.execute(sql, transaction_id)
	cash = cur.fetchone()	
	sql = "SELECT amount FROM transaction_id FROM transactions"
	cur.execute(sql, transaction_id)
	pts = cur.fetchone()
	conn.commit()








