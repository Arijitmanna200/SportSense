from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import traceback
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load('sports_career_rf_model.pkl')

likert_cols = [
    'I encourage my child to participate in competitive sports. ',
    'I would support my child if they wanted to pursue sports as a full-time career. ',
    'A career in sports lacks job security. ',
    'Sports can be as respectable and successful a career as medicine/engineering. ',
    'I am aware of sports scholarships for young athletes in India. ',
    'I believe that schools provide enough support for children in sports. ',
    'Sports careers come with high injury risks.  ',
    "A sports career can affect my child's education negatively.  ",
    'Financial stability is a major concern in sports careers.  '
]

@app.route('/')
def home():
    return jsonify({"message": "Sports Career Support Prediction API is running!"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        likert_values = [data[q.strip()] for q in likert_cols]
        age_group = data['Age_group']
        education = data['Education']
        gender = data['Gender']

        support_index = np.mean([
            likert_values[0],
            likert_values[1],
            likert_values[3] 
        ])

        input_data = likert_values + [support_index, age_group, education, gender]
        feature_cols = likert_cols + ['Support_Index', 'Age_group', 'Education', 'Gender']
        input_df = pd.DataFrame([input_data], columns=feature_cols)

        probs = model.predict_proba(input_df)[0]

        support_classes = [3, 4]
        support_prob = sum([probs[c] for c in support_classes])

        if support_prob >= 0.5:
            prediction_text = "Would SUPPORT sports career"
        else:
            prediction_text = "UNLIKELY to support sports career"

        confidence = support_prob if support_prob >= 0.5 else 1 - support_prob

        return jsonify({
            "prediction": prediction_text,
            "confidence": round(float(confidence*100), 2),
            "class_probabilities": probs.tolist()
        })

    except Exception as e:
         traceback.print_exc()
         return jsonify({"error": str(e),
                        "message": "An error occurred during prediction.",
                        "trace": traceback.format_exc()}),400


@app.route('/getQuestion', methods=['GET'])
def getQuestion():
    try:
        question = {f"q{i+1}": value for i, value in enumerate(likert_cols)}
        return jsonify({"questions": question})
     
    except Exception as e:
         traceback.print_exc()
         return jsonify({"error": str(e),
                        "message": "An error occurred during prediction.",
                        "trace": traceback.format_exc()}),400


if __name__ == '__main__':
    app.run(debug=True)
    # port = 5000
    # app.run(host="0.0.0.0", port=port)
