const handleProcessedReview = (review, setChartData, setIsLoading, setShowChart) => {
    console.log('Received new review:', review);
    if (review && review.bestFitAudience) {
        setChartData((prevData) => {
            setIsLoading(false);
            setShowChart(true);

            const newData = { ...prevData };
            const personaIndex = review.bestFitAudience - 1;
            const newDataset = { ...newData.datasets[0] };
            const newDatasetData = [...newData.datasets[0].data];
            newDatasetData[personaIndex]++;
            newDataset.data = newDatasetData;
            newData.datasets = [newDataset];

            return newData;
        });
    } else {
        console.error('Received invalid review:', review);
    }
};

export default handleProcessedReview;
