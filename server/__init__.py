from flask import Flask, render_template, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

spreadsheet = 'UPML VVV TEST'
scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/drive']

creds = ServiceAccountCredentials.from_json_keyfile_name('UPML VVV-746996c120b5.json', scope)
client = gspread.authorize(creds)

@app.route('/', methods = ['GET'])
def main_page():
	return render_template('index.html')

@app.route('/api/results', methods = ['POST'])
def get_data():
	sh = client.open(spreadsheet)
	worksheet = sh.get_worksheet(0)
	data = worksheet.get_all_values()
	temp_d = {}
	for i in range(1,20):
		temp_d[i] = 0
	for ob in data[1:]:
		key = int(ob[1].split()[0])
		if(key>0):
			temp_d[key]+=1
	temp_d = sorted(temp_d.items(), key=lambda ob:ob[1], reverse=True)
	return jsonify(temp_d)
