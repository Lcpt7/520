from datetime import datetime

from flask import Flask, jsonify, render_template, request


app = Flask(__name__)

CONFESSION = {
    "her_name": "刘娟",
    "your_name": "揭川",
    "known_since": "10年以前",
}


@app.get("/")
def index():
    return render_template("index.html", confession=CONFESSION)


@app.post("/api/confession")
def confession_reply():
    data = request.get_json(silent=True) or {}
    answer = str(data.get("answer", "")).strip()

    messages = {
        "yes": "这一刻我会记很久很久。谢谢你愿意给我一个靠近你的机会。",
        "think": "没关系，慢慢想。喜欢你这件事，我本来就认真，也愿意尊重你的节奏。",
        "friend": "谢谢你认真看完。能把心意说出口，对我来说已经很勇敢了。",
    }

    return jsonify(
        {
            "message": messages.get(answer, "谢谢你来到这里，也谢谢你读到最后。"),
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
