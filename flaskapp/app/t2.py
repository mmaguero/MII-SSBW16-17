from flask import Flask, session, redirect, url_for, escape, request, render_template
app = Flask(__name__)
app.config['DEBUG'] = True
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

@app.route('/')
def home():
    if 'username' in session:
        return render_template('resume.html')
    return render_template('signin.html')

@app.route('/resume')
def resume():
    if 'username' in session:
        return render_template('resume.html')
    return render_template('signin.html')

@app.route('/analytics')
def analytics():
    if 'username' in session:
        return render_template('analytics.html')
    return render_template('signin.html')

@app.route('/reports')
def reports():
    if 'username' in session:
        return render_template('analytics.html')
    return render_template('signin.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form.get('inputEmail')
        return redirect(url_for('home'))
    return render_template('signin.html')

@app.route('/logout')
def logout():
    if 'username' in session:
        session.pop('username', None)
        return redirect(url_for('home'))
    return render_template('signin.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
