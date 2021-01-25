from flask.cli import FlaskGroup
from server import app

cli = FlaskGroup(app)
SERVER_PORT = '5000'

if(__name__ == '__main__'):
	# print(f'Running server on {SERVER_PORT}')
	# app.run(port=SERVER_PORT, debug=True)
	cli()