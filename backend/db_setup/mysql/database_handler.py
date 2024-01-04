
# MongoDB connection configuration
import mysql.connector
from db_setup.mysql.db_setup import host, user, password, dbname, tablemame

try:
  print("Db connecting...")
  connection = mysql.connector.connect(
      host=host,
      user=user,
      password=password,
  )

  # Create a cursor to interact with the database
  cursor = connection.cursor()

  cursor.execute(f"CREATE DATABASE IF NOT EXISTS {dbname}")
  cursor.execute(f"use {dbname}")
  cursor.execute(f"CREATE TABLE IF NOT EXISTS {tablemame} (_id INT AUTO_INCREMENT PRIMARY KEY, id INT, user VARCHAR(50) NOT NULL, datetime VARCHAR(50) NOT NULL, question TEXT, answer TEXT, header TINYINT, title TEXT)")

  cursor.close()
  connection.close()
  connection = mysql.connector.connect(
      host=host,
      user=user,
      password=password,
      database=dbname,
  )

  cursor = connection.cursor()


except mysql.connector.Error as err:
    print(f"Error: {err}")


def db_get_connection():
  connection = mysql.connector.connect(
      host=host,
      user=user,
      password=password,
      database=dbname,
  )
  cursor = connection.cursor()

def db_close_connection():
  connection.close()
  cursor.close()
  

def db_add_chat_log(log_data):
  # db_get_connection()

  try:
    insert_query = f"INSERT INTO {tablemame} (id, user, datetime, question, answer, header, title) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    data_to_insert = (log_data["id"], log_data["user"], log_data["datetime"], log_data["question"], log_data["answer"], log_data["header"], log_data["title"])
    cursor.execute(insert_query, data_to_insert)

    connection.commit()

  # db_close_connection()
    
  except mysql.connector.Error as err:
    print(f"Error: {err}")



def db_get_all_data_for_chat(username, chat_id):
  # db_get_connection()

  try:
    select_query = f"SELECT id, question, answer FROM {tablemame} where id = {chat_id} and header = 0 and user = {username}"
    cursor.execute(select_query)
    filtered_data = cursor.fetchall()

  # db_close_connection()
  
    response_data = []
    for document in filtered_data:
      new_data = {}
      new_data["id"] = document[0]
      new_data["question"] = document[1]
      new_data["answer"] = document[2]
      response_data.append(new_data)

    return response_data

  except mysql.connector.Error as err:
    print(f"Error: {err}")
    return err



def db_get_chat_list(username):
  # db_get_connection()

  try:
    select_query = f"SELECT id, title, datetime FROM {tablemame} where header = 1 and user = {username}"
    cursor.execute(select_query)
    filtered_data = cursor.fetchall()

    # db_close_connection()

    response_data = []
    previous_datetime = ''
    for document in filtered_data:
      new_data = {}
      new_data["id"] = document[0]
      new_data["title"] = document[1]

      if previous_datetime != document[2]:
        new_data["datetime"] = document[2]

      previous_datetime = document[2]
      response_data.append(new_data)

    return response_data
  
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    return err



def db_create_new_chat(username, datetime, title):
  # db_get_connection()

  try:
    select_query = f"SELECT id FROM {tablemame} where header = 1 and user = {username}"
    cursor.execute(select_query)

    # db_close_connection()

    new_id = 0
    rows = cursor.fetchall()
    for row in rows:
        if row[0] > new_id:
          new_id = row[0]

    new_id += 1

    newLog = {}
    newLog["id"] = new_id
    newLog["user"] = username
    newLog["datetime"] = datetime
    newLog["question"] = ""
    newLog["answer"] = ""
    newLog["header"] = 1
    newLog["title"] = title
    
    db_add_chat_log(newLog)
    return new_id
  
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    return err


def db_remove_chat(username, chat_id):
  # db_get_connection()

  try:
    deletequery = f"DELETE FROM {tablemame} where user = {username} and id = {chat_id};"
    print(deletequery)
    cursor.execute(deletequery)

    connection.commit()
    # db_close_connection()

    result_multiple = 'success'
    return result_multiple
  
  except mysql.connector.Error as err:
    print(f"Error: {err}")
    return err