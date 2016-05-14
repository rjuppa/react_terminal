# This file provided by Facebook is for non-commercial testing and evaluation
# purposes only. Facebook reserves all rights not expressly granted.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# import json
# import os
# import time
# from flask import Flask, Response, request, render_template
# from flask import render_template
#
# app = Flask(__name__, static_url_path='', static_folder='dist')
# app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
#
# @app.route('/index', methods=['GET', 'POST'])
# def index_handler():
#     print 'index_handler'
#     if request.method == 'POST':
#         content = request.get_json(silent=True)
#         print content
#     else:
#         name = 'user1'
#         return render_template('index.html', name=name)
#
#
#
# @app.route('/api/comments', methods=['GET', 'POST'])
# def comments_handler():
#
#     with open('comments.json', 'r') as file:
#         comments = json.loads(file.read())
#
#     if request.method == 'POST':
#         newComment = request.form.to_dict()
#         newComment['id'] = int(time.time() * 1000)
#         comments.append(newComment)
#
#         with open('comments.json', 'w') as file:
#             file.write(json.dumps(comments, indent=4, separators=(',', ': ')))
#
#     return Response(json.dumps(comments), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})
#
# if __name__ == '__main__':
#     app.run(port=int(os.environ.get("PORT", 3000)))



import os
import jinja2
from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from flask.ext.login import (LoginManager, current_user, login_required,
                            login_user, logout_user, UserMixin, AnonymousUserMixin,
                            confirm_login, fresh_login_required)


class User(UserMixin):
    def __init__(self, name, id, active=True):
        self.name = name
        self.id = id
        self.active = active

    def is_active(self):
        return self.active


class Anonymous(AnonymousUserMixin):
    name = u"Anonymous"


USERS = {
    1: User(u"N001", 1),
    2: User(u"N002", 2),
    3: User(u"N001", 3, False),
}

USER_NAMES = dict((u.name, u) for u in USERS.itervalues())


def get_user_by_chipcard(chipcard):
    for u in USERS.itervalues():
        if u.name == chipcard:
            return u

tmpl_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

app = Flask(__name__, static_url_path='', static_folder='dist')
app.add_url_rule('/', 'dist', lambda: app.send_static_file('index.html'))
app.jinja_loader = jinja2.ChoiceLoader([
    app.jinja_loader,
    jinja2.FileSystemLoader(tmpl_dir),
])

SECRET_KEY = '123456789'
DEBUG = True

app.config.from_object(__name__)

login_manager = LoginManager()

login_manager.anonymous_user = Anonymous
login_manager.login_view = "index"
login_manager.login_message = u"Please log in to access this page."
login_manager.refresh_view = "reauth"


class HTTP400(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


@login_manager.user_loader
def load_user(id):
    return USERS.get(int(id))


login_manager.setup_app(app)


@app.route("/secret")
@fresh_login_required
def secret():
    return render_template("secret.html")


@app.route('/index', methods=['GET', 'POST'])
def index():
    if request.method == "POST" and "chipcard_num" in request.form:
        chipcard_num = request.form["chipcard_num"]
        if chipcard_num in USER_NAMES:
            user = get_user_by_chipcard(chipcard_num)
            if login_user(user):
                return jsonify(status='success', username=user.name, id=user.id)

        response = jsonify(status='failed', error='Login failed')
        response.status_code = 401
        return response

    return render_template("index.html")


@app.route("/logout")
@login_required
def logout():
    logout_user()
    return jsonify(status='success', message='ok')


@app.route('/actions', methods=['POST'])
def actions():
    id = session['user_id']
    if request.method == "POST":
        data = request.get_json()
        try:
            action_id = data["action_id"]
            # TODO
            return jsonify(status='success', message='ok')
        except Exception as e:
            raise HTTP400(e.message)


if __name__ == "__main__":
    app.run(port=int(os.environ.get("PORT", 3000)))
