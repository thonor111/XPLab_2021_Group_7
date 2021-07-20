// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `This is a sample introduction view.
            <br />
            <br />
            The introduction view welcomes the participant and gives general information
            about the experiment. You are in the <strong>${coin}</strong> group.
            <br />
            <br />
            This is a minimal experiment with one forced choice view. It can serve as a starting point for programming your own experiment.`,
  buttonText: 'begin the experiment'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'General Instructions',
  text: `We are following up on a previously published paper that looked at how people feel about moral dilemmas.
          <br />
          In the previous paper, a moral dilemma was described that involved two possible courses of actions.
          Participants chose which action they preferred and had to rate how they would feel about performing that action.
          <br />
          In this study, you will be presented with a scenario describing a moral dilemma.
          You will choose which action you would take and then provide a rating of how good or bad you imagine you would feel after taking that action.`,
  buttonText: 'go to the trial'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/


// Here, we initialize a normal forced_choice view
const topic_choice_trial = magpieViews.view_generator(
  "sentence_choice",
  {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.topic_choice.length,
    // name should be identical to the variable name
    name: 'topic_choice_trial',
    data: trial_info.topic_choice,
    // you can add custom functions at different stages through a view's life cycle
    hook: {
        after_response_enabled: check_response
    }
  },
  {
    stimulus_container_generator: function (config, CT) {
      return `<div class='magpie-view'>
              </div>`;
    },
    answer_container_generator: function(config, CT) {
      return `<div class='magpie-view-answer-container'>
                  <p class='magpie-view-question'>${config.data[CT].question}</p>
                  <label for='s1' class='magpie-response-sentence'>${config.data[CT].option1}</label>
                  <input type='radio' name='answer' id='s1' value="${config.data[CT].option1}" />
                  <label for='s2' class='magpie-response-sentence'>${config.data[CT].option2}</label>
                  <input type='radio' name='answer' id='s2' value="${config.data[CT].option2}" />
                  <label for='s3' class='magpie-response-sentence'>${config.data[CT].option3}</label>
                  <input type='radio' name='answer' id='s3' value="${config.data[CT].option3}" />
                  <label for='s4' class='magpie-response-sentence'>${config.data[CT].option4}</label>
                  <input type='radio' name='answer' id='s4' value="${config.data[CT].option4}" />
                  <label for='s5' class='magpie-response-sentence'>${config.data[CT].option5}</label>
                  <input type='radio' name='answer' id='s5' value="${config.data[CT].option5}" />
                  <label for='s6' class='magpie-response-sentence'>${config.data[CT].option6}</label>
                  <input type='radio' name='answer' id='s6' value="${config.data[CT].option6}" />
                  <label for='s7' class='magpie-response-sentence'>${config.data[CT].option7}</label>
                  <input type='radio' name='answer' id='s7' value="${config.data[CT].option7}" />
                  <label for='s8' class='magpie-response-sentence'>${config.data[CT].option8}</label>
                  <input type='radio' name='answer' id='s8' value="${config.data[CT].option8}" />
                  <label for='s9' class='magpie-response-sentence'>${config.data[CT].option9}</label>
                  <input type='radio' name='answer' id='s9' value="${config.data[CT].option9}" />
              </div>`;
    }
  }
);


var group_rating_trial = magpieViews.view_generator(
  'rating_scale',
  {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: 1,
    // name should be identical to the variable name
    name: 'group_rating',
    data: trial_info.group_rating
    // you can add custom functions at different stages through a view's life cycle
    /*hook: {
        after_response_enabled: check_response
    }*/
  },
  {
    stimulus_container_generator: function (config, CT) {
      return `<div class='magpie-view'>
        <h1 class='magpie-view-title'>${config.title}</h1>
        <p class='magpie-view-question magpie-view-qud'>${important_topic}</p>
        <div class='magpie-view-stimulus-container'>
            <div class='magpie-view-stimulus magpie-nodisplay'></div>
        </div>
      </div>`;
    },
    answer_container_generator: function(config, CT) {
      return `<p class='magpie-view-question'>${config.data[CT].question}</p>
              <div class='magpie-view-answer-container'>
                  <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].option1}</strong>
                  <label for="1" class='magpie-response-rating'>-5</label>
                  <input type="radio" name="answer" id="1" value="-5" />
                  <label for="2" class='magpie-response-rating'>-4</label>
                  <input type="radio" name="answer" id="2" value="-4" />
                  <label for="3" class='magpie-response-rating'>-3</label>
                  <input type="radio" name="answer" id="3" value="-3" />
                  <label for="4" class='magpie-response-rating'>-2</label>
                  <input type="radio" name="answer" id="4" value="-2" />
                  <label for="5" class='magpie-response-rating'>-1</label>
                  <input type="radio" name="answer" id="5" value="-1" />
                  <label for="6" class='magpie-response-rating'>0</label>
                  <input type="radio" name="answer" id="6" value="0" />
                  <label for="7" class='magpie-response-rating'>1</label>
                  <input type="radio" name="answer" id="7" value="1" />
                  <label for="8" class='magpie-response-rating'>2</label>
                  <input type="radio" name="answer" id="8" value="2" />
                  <label for="9" class='magpie-response-rating'>3</label>
                  <input type="radio" name="answer" id="9" value="3" />
                  <label for="10" class='magpie-response-rating'>4</label>
                  <input type="radio" name="answer" id="10" value="4" />
                  <label for="11" class='magpie-response-rating'>5</label>
                  <input type="radio" name="answer" id="11" value="5" />
                  <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].option2}</strong>
              </div>`;
    },
  }
);


const dilemma_trial = magpieViews.view_generator(
  'rating_scale',
  {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.dilemma.length,
    // name should be identical to the variable name
    name: 'dilemma_trial',
    data: trial_info.dilemma
    // you can add custom functions at different stages through a view's life cycle
    /*hook: {
        after_response_enabled: check_response
    }*/
  },
  {
    stimulus_container_generator: function (config, CT) {
      return `<div class='magpie-view'>
        <h1 class='magpie-view-title'>${config.title}</h1>
        <p class='magpie-view-question'>${config.data[CT].question}</p>
        <p class='magpie-view-question'>${get_group_decisions()}</p>
      </div>`;
    },
    answer_container_generator: function(config, CT) {
      return `<p class='magpie-view-question'></p>
              <div class='magpie-view-answer-container'>
                  <strong class='magpie-response-rating-option-small magpie-view-text'>${config.data[CT].option1}</strong>
                  <label for="1" class='magpie-response-rating'>-3</label>
                  <input type="radio" name="answer" id="1" value="-3" />
                  <label for="2" class='magpie-response-rating'>-2</label>
                  <input type="radio" name="answer" id="2" value="-2" />
                  <label for="3" class='magpie-response-rating'>-1</label>
                  <input type="radio" name="answer" id="3" value="-1" />
                  <label for="4" class='magpie-response-rating'>1</label>
                  <input type="radio" name="answer" id="4" value="1" />
                  <label for="5" class='magpie-response-rating'>2</label>
                  <input type="radio" name="answer" id="5" value="2" />
                  <label for="6" class='magpie-response-rating'>3</label>
                  <input type="radio" name="answer" id="6" value="3" />
                  <strong class='magpie-response-rating-option-small magpie-view-text'>${config.data[CT].option2}</strong>
              </div>`;
    }
  }
);

const feeling_trial = magpieViews.view_generator(
  'rating_scale',
  {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.feeling.length,
    // name should be identical to the variable name
    name: 'feeling_trial',
    data: trial_info.feeling
    // you can add custom functions at different stages through a view's life cycle
    /*hook: {
        after_response_enabled: check_response
    }*/
  },
  {
    stimulus_container_generator: function (config, CT) {
      return `<div class='magpie-view'>
        <h1 class='magpie-view-title'>${"Your feeling about your decision"}</h1>
        <p class='magpie-view-question'>${`<br /><br /><br /><br />`}</p>
      </div>`;
    },
    answer_container_generator: function(config, CT) {
      return `<p class='magpie-view-question'>${config.data[CT].question}</p>
              <div class='magpie-view-answer-container'>
                  <strong class='magpie-response-rating-option-small magpie-view-text'>${config.data[CT].option1}</strong>
                  <label for="1" class='magpie-response-rating'>-3</label>
                  <input type="radio" name="answer" id="1" value="-3" />
                  <label for="2" class='magpie-response-rating'>-2</label>
                  <input type="radio" name="answer" id="2" value="-2" />
                  <label for="3" class='magpie-response-rating'>-1</label>
                  <input type="radio" name="answer" id="3" value="-1" />
                  <label for="4" class='magpie-response-rating'>1</label>
                  <input type="radio" name="answer" id="4" value="1" />
                  <label for="5" class='magpie-response-rating'>2</label>
                  <input type="radio" name="answer" id="5" value="2" />
                  <label for="6" class='magpie-response-rating'>3</label>
                  <input type="radio" name="answer" id="6" value="3" />
                  <strong class='magpie-response-rating-option-small magpie-view-text'>${config.data[CT].option2}</strong>
              </div>`;
    }
  }
);

const attention_trial = magpieViews.view_generator(
  "sentence_choice",
  {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: trial_info.attention.length,
    // name should be identical to the variable name
    name: 'attention_trial',
    data: trial_info.attention
  },
  {
    stimulus_container_generator: function (config, CT) {
      return `<div class='magpie-view'>
              </div>`;
    },
    answer_container_generator: function(config, CT) {
      return `<div class='magpie-view-answer-container'>
                  <p class='magpie-view-question'>${config.data[CT].question}</p>
                  <label for='s1' class='magpie-response-sentence'>${config.data[CT].option1}</label>
                  <input type='radio' name='answer' id='s1' value="${config.data[CT].option1}" />
                  <label for='s2' class='magpie-response-sentence'>${config.data[CT].option2}</label>
                  <input type='radio' name='answer' id='s2' value="${config.data[CT].option2}" />
                  <label for='s3' class='magpie-response-sentence'>${config.data[CT].option3}</label>
                  <input type='radio' name='answer' id='s3' value="${config.data[CT].option3}" />
                  <label for='s4' class='magpie-response-sentence'>${config.data[CT].option4}</label>
                  <input type='radio' name='answer' id='s4' value="${config.data[CT].option4}" />
              </div>`;
    }
  }
);

const identification_trial = magpieViews.view_generator(
  "rating_scale",
  {
    // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
    trials: 2,
    // name should be identical to the variable name
    name: 'identification_trial',
    data: trial_info.identification
  },
  {
    stimulus_container_generator: function (config, CT) {
      return `<div class='magpie-view'>
        <h1 class='magpie-view-title'>${"Your feeling about your decision"}</h1>
        <p class='magpie-view-question'>${`<br /><br /><br /><br />`}</p>
      </div>`;
    },
    answer_container_generator: function(config, CT) {
      return `<p class='magpie-view-question'>${config.data[CT].question}</p>
              <div class='magpie-view-answer-container'>
                  <strong class='magpie-response-rating-option-small magpie-view-text'>${config.data[CT].option1}</strong>
                  <label for="1" class='magpie-response-rating'>-3</label>
                  <input type="radio" name="answer" id="1" value="-3" />
                  <label for="2" class='magpie-response-rating'>-2</label>
                  <input type="radio" name="answer" id="2" value="-2" />
                  <label for="3" class='magpie-response-rating'>-1</label>
                  <input type="radio" name="answer" id="3" value="-1" />
                  <label for="4" class='magpie-response-rating'>1</label>
                  <input type="radio" name="answer" id="4" value="1" />
                  <label for="5" class='magpie-response-rating'>2</label>
                  <input type="radio" name="answer" id="5" value="2" />
                  <label for="6" class='magpie-response-rating'>3</label>
                  <input type="radio" name="answer" id="6" value="3" />
                  <strong class='magpie-response-rating-option-small magpie-view-text'>${config.data[CT].option2}</strong>
              </div>`;
    }
  }
);

/*
const topic_choice_trial = magpieViews.view_generator('sentence_choice', {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: topic_choice.length,
  // name should be identical to the variable name
  name: 'topic_choice',
  data: topic_choice,
  // you can add custom functions at different stages through a view's life cycle
  hook: {
      after_response_enabled: check_response
  }
});

const dilemma_trial = magpieViews.view_generator('rating_scale', {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: rating_scale.length,
  // name should be identical to the variable name
  name: 'dilemma',
  data: dilemma,
  optionLeft: 'call the police and report the robber',
  optionRight: 'do nothing and leave the robber alone',
  // you can add custom functions at different stages through a view's life cycle
  hook: {
      after_response_enabled: check_response
  }
});*/
// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
