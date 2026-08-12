from src.pipeline.prediction_pipeline import PredictionPipeline

if __name__=="__main__":
    input_df={
        "Follicle No. (R)":10,
        "Follicle No. (L)":12,
        "Skin darkening (Y/N)":1,
        "hair growth(Y/N)":1,
        "Weight gain(Y/N)":1,
        "Cycle(R/I)":4,
        "Fast food (Y/N)":1,
        "Pimples(Y/N)":1,
        "Weight (Kg)":72,
        "BMI_Update":27.5
    }
    pipeline=PredictionPipeline()
    prediction=pipeline.predict(input_df)
    if prediction == 1:
        print("PCOS Detected")
    else:
        print("No PCOS Detected")
