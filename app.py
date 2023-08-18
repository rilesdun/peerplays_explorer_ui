from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/accounts')
def accounts():
    return render_template('accounts.html')

@app.route('/account/<string:account_name>', methods=['GET'])
def account_details(account_name):
    try:
        account_info = get_account_info(account_name)
        return render_template('account_details.html', account_info=account_info)
    except AccountDoesNotExistsException:
        return jsonify(error="Account does not exist"), 404

@app.route('/blocks')
def blocks():
    return render_template('blocks.html')

@app.route('/blocks/transactions')
def transactions():
    return render_template('transactions.html')

if __name__ == '__main__':
    app.run(port=8080, debug=True)
