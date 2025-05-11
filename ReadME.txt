Eternal Return ML System

This project uses machine learning to analyze match data from the game Eternal Return and generate performance-based recommendations. It consists of three core models:

Project Files:
1. TeamWinRate.ipynb – Predicts whether a team will win based on team composition and early performance stats.
2. CharWinRate.ipynb – Predicts the win potential of a single character per match.
3. CharacterBuild.ipynb – Recommends optimal builds (items + traits) for each character using historical high-rank match data.

Project Aim:
To support better decision-making in Eternal Return by:
- Predicting outcomes based on team setups and stats.
- Evaluating individual character viability.
- Recommending successful equipment/trait combinations.

How to Run:
1. Make sure you have Python 3.8 or higher installed.
2. Install the required libraries using the `requirements.txt` file or manually via pip.
3. Place your dataset (e.g., players_data.csv) in the same directory as the notebooks.
4. Open and run each `.ipynb` file using Jupyter Notebook, Google Colab, or VSCode.

Dependencies:
- pandas
- scikit-learn
- xgboost
- lightgbm
- matplotlib
- seaborn

Evaluation:
Each model uses either regression or classification metrics, including Accuracy, F1 Score, Precision, and Recall. Feature engineering and preprocessing are performed inside each notebook.

Note:
The dataset used consists of 10k+ data of Eternal Return matches both ranked and unranked.