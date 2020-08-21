import atexit
from webbrowser import open_new_tab

from flask import Flask, render_template, session, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config["SECRET_KEY"] = "!secret"
socketio = SocketIO(app)


@app.route("/")
def index():
    session["some_data"] = {"a": 1}
    return render_template("index.html")


@app.route("/shutdown")
def shutdown():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()
    close_app()
    return render_template("shutdown.html")


@socketio.on("message-client")
def get_message(data):
    socketio.emit("message-server", data)


def close_app():
    pass


if __name__ == "__main__":
    atexit.register(close_app)
    open_new_tab("http://localhost:8000/")
    socketio.run(app, host="localhost", port="8000", debug=False)

