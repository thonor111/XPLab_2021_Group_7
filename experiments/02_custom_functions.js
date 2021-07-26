// Here, you can define all custom functions, you want to use and initialize some variables

/* Variables
*
*
*/
const coin = _.sample(["head", "tail"]); // You can determine global (random) parameters here
const outgroup = _.sample([true, false]);
const group_action = _.sample(["call", "nothing"]);
const ingroup_first = _.sample([true, false]);

var important_topic;
var group_rating_trial;
// Declare your variables here



/* Helper functions
*
*
*/


/* For generating random participant IDs */
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};
// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};
// Declare your helper functions here



/* Hooks  
*
*
*/

// Error feedback if participants exceeds the time for responding
const time_limit = function(data, next) {
    if (typeof window.timeout === 'undefined'){
        window.timeout = [];
    }
    // Add timeouts to the timeoutarray
    // Reminds the participant to respond after 5 seconds
    window.timeout.push(setTimeout(function(){
          $('#reminder').text('Please answer more quickly!');
    }, 5000));
    next();
};

// compares the chosen answer to the value of `option1`
check_response = function(data, next) {
    $('input[name=answer]').on('change', function(e) {
        important_topic = e.target.value;
        initialize_trials();
    })
}

// Declare your hooks here


/* Generators for custom view templates, answer container elements and enable response functions
*
*
*/

const has_topic = (element) => element.topic == important_topic;

const get_trials_by_topic = function(trials) {
    return(trials.filter(has_topic));
}

const initialize_trials = function() {
    // console.log("in intitialize");
    // console.log(important_topic)
    // group_rating_trial = magpieViews.view_generator('rating_scale', {
    //     // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    //     trials: get_trial_by_topic(trial_info.group_rating).length,
    //     // name should be identical to the variable name
    //     name: 'group_rating',
    //     data: get_trial_by_topic(trial_info.group_rating)
    //     // you can add custom functions at different stages through a view's life cycle
    //     /*hook: {
    //         after_response_enabled: check_response
    //     }*/
    //   });

    trial_info.group_rating = get_trials_by_topic(trial_info.group_rating);
    group_rating_trial = magpieViews.view_generator('rating_scale', {
        // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
        trials: 1,
        // name should be identical to the variable name
        name: 'group_rating',
        data: trial_info.group_rating
        // you can add custom functions at different stages through a view's life cycle
        /*hook: {
            after_response_enabled: check_response
        }*/
    });

    trial_info.identification = get_trials_by_topic(trial_info.identification);
}

const get_group_decisions =function() {
    if(!outgroup) {
        if (group_action == "call") {
            return(`<br />
                    <strong>In the previous study:</strong>
                    <br />
                    <br />
                    <span>&#8226;</span> approximately 60% of participants who agreed with you about ${important_topic}
                    chose to call the police and report the robber.`);
        }
        else {
            return(`<br />
                    <strong>In the previous study:</strong>
                    <br />
                    <br />
                    <span>&#8226;</span> approximately 60% of participants who agreed with you about ${important_topic}
                    chose to do nothing and leave the robber alone.`);
        }
        
    }
    else {
        if (group_action == "call") {
            if (ingroup_first) {
                return(`<br />
                    <strong>In the previous study:</strong>
                    <br />
                    <br />
                    <span>&#8226;</span> approximately 60% of participants who agreed with you about ${important_topic}
                    chose to call the police and report the robber.
                    <br />
                    <span>&#8226;</span> approximately 85% of participants who disagreed with you about ${important_topic}
                    chose to do nothing and leave the robber alone.`);
            }
            else {
                return(`<br />
                    <strong>In the previous study:</strong>
                    <br />
                    <br />
                    <span>&#8226;</span> approximately 85% of participants who disagreed with you about ${important_topic}
                    chose to do nothing and leave the robber alone.
                    <br />
                    <span>&#8226;</span> approximately 60% of participants who agreed with you about ${important_topic}
                    chose to call the police and report the robber.`);
            }
        }
        else {
            if (ingroup_first) {
                return(`<br />
                    <strong>In the previous study:</strong>
                    <br />
                    <br />
                    <span>&#8226;</span> approximately 60% of participants who agreed with you about ${important_topic}
                    chose to do nothing and leave the robber alone.
                    <br />
                    <span>&#8226;</span> approximately 85% of participants who disagreed with you about ${important_topic}
                    chose to call the police and report the robber.`);
            }
            else {
                return(`<br />
                    <strong>In the previous study:</strong>
                    <br />
                    <br />
                    <span>&#8226;</span> approximately 85% of participants who disagreed with you about ${important_topic}
                    chose to call the police and report the robber.
                    <br />
                    <span>&#8226;</span> approximately 60% of participants who agreed with you about ${important_topic}
                    chose to do nothing and leave the robber alone.`);
            }
        }
    }
    
}
