"""
 flask routes for the web app
"""

from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
    """
    Index/Home page
    """
    return render_template('index.html')

@app.route('/accounts')
def accounts():
    """
    Accounts page
    """
    return render_template('accounts.html')

@app.route('/accounts/witnesses')
def accounts_witnesses():
    """
    Witnesses page
    """
    return render_template('witnesses.html')

@app.route('/accounts/sons')
def accounts_sons():
    """
    Sons page
    """
    return render_template('sons.html')

@app.route('/accounts/<string:account_name>', methods=['GET'])
def account_details():
    """
    Account details page
    """
    return render_template('account_details.html')

@app.route('/assets')
def assets():
    """
    Assets page
    """
    return render_template('assets.html')

@app.route('/blocks')
def blocks():
    """
    Blocks page
    """
    return render_template('blocks.html')

@app.route('/blocks/transactions')
def transactions():
    """
    Transactions page
    """
    return render_template('transactions.html')

if __name__ == '__main__':
    app.run(port=8080)
