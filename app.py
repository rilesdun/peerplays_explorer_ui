from flask import Flask, render_template
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/accounts')
def accounts():
    return render_template('accounts.html')

@app.route('/accounts/witnesses')
def accounts_witnesses():
    return render_template('witnesses.html')

@app.route('/accounts/sons')
def accounts_sons():
    return render_template('sons.html')
    
@app.route('/accounts/<string:account_name>', methods=['GET'])
def account_details(account_name):
    return render_template('account_details.html')

@app.route('/assets')
def assets():
    return render_template('assets.html')

@app.route('/blocks')
def blocks():
    return render_template('blocks.html')

@app.route('/blocks/transactions')
def transactions():
    return render_template('transactions.html')

if __name__ == '__main__':
    app.run(port=8080)
