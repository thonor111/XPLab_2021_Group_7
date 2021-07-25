// In this file you initialize and configure your experiment using magpieInit

$("document").ready(function() {
    // prevent scrolling when space is pressed
    window.onkeydown = function(e) {
        if (e.keyCode === 32 && e.target === document.body) {
            e.preventDefault();
        }
    };

    // calls magpieInit
    // in debug mode this returns the magpie-object, which you can access in the console of your browser
    // e.g. >> window.magpie_monitor or window.magpie_monitor.findNextView()
    // in all other modes null will be returned
    window.magpie_monitor = magpieInit({
        // You have to specify all views you want to use in this experiment and the order of them
        views_seq: [
            intro,
            post_test,
            topic_choice_trial,
            instructions_group_rating,
            group_rating_trial,
            instructions,
            dilemma_trial,
            feeling_trial,
            attention_trial,
            identification_trial,
            thanks,
        ],
        // Here, you can specify all information for the deployment
        deploy: {
            experimentID: "259",
            serverAppURL: "https://magpie-demo.herokuapp.com/experiments/",
            // Possible deployment methods are:
            // "debug" and "directLink"
            // As well as "MTurk", "MTurkSandbox" and "Prolific"
            deployMethod: "directLink",
            contact_email: "tnortmann@uni-osnabrueck.de",
            prolificURL: ""
        },
        // Here, you can specify how the progress bar should look like
        progress_bar: {
            in: [],
             // Possible styles are "default", "separate" and "chunks"
            style: "separate",
            width: 100
        }
    });
});
