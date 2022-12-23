

# table design

table: session_templates
id: string
name: string
user_id: string
duration: 1 hour
exercises: ['PUSHUP', 'SQUAT']
[
  {
    type: 'PUSHUP',
    sets: 3,
    reps: 20,
  },
  {
    type: 'SQUAT',
    sets: 3,
    reps: 20,
  }
]

tuesday/thursday pushups only
wednesday pushups and pullups

session
id
start_time
status: active (null), complete

[1, '20221205T9:00', ''] (sessions)
[E1, 'PUSHUP', {}]
[E2, 'SQUAT', {}]
[E3, 'PUSHUP', {}]

Session Page View

* Show a list of exercises to add to their session
  * Autosuggest search field
    * Scenario 1: Empty autosuggest
      * Most used exercises
      * Most popular exercises
    * Scenario 2: User types in a search term
      * Search for exercises that match the search term
* Show any new exercises they've added themselves
* Display a button to end the session
    * Takes them back to the dashboard

Scenario 1: User enters the app and forgets to end a previous session
* Display a message that says "You have a session currently active."
    * Provide a link to re-enter the session page view to continue editing (or to end the session)

session_exercises
session_id
exercise_id: Pushup, pullup, squat
data

table: exercises
id: string (PUSHUP, PULLUP, SQUAT)
name: string (Push-up, Pullup, Squat)
acefitness_url: string (description of the exercise)
category: string

table: categories
id: string
name: string
description: string

table: exercise_categories
id: string
exercise_id: string
category_id: string

pullups
bodyweight - reps
weighted - weight


