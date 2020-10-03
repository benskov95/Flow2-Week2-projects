Benjamin Skovgaard - cph-bs190@cphbusiness.dk

# Flow2-Week2-projects

## Notes

I have deployed my 'person_client' (front-end) project on my droplet's nginx server 
and deployed the person REST API from last week ('rest_jax_rs') on tomcat. The front-end 
portion communicates with the back-end (API) to do various fetch calls (GET, POST, 
PUT, DELETE). The link to the website with the deployed front-end on nginx can be 
found here:

- https://bencat.dk/person/

Link to the REST API that the client fetches data from:

- https://bencat.dk/pclient/api/person/all

Link to the deployed country map from the Friday exercise:

- https://bencat.dk/countrymap/

## Monday
Did code review of last week's exercises.

## Tuesday
All of the files in this folder contain exercises from the same exercise sheet. 
'Javascript challenges' contains various JavaScript files with exercises, some
of which were done in (online) class and others that I did by myself (5 and 6+7+8)
outside of class. The 'js_exercises_period2' file contains the other exercises from
the exercise sheet, and the 'SimpleWebpackBabelForPlainJS' folder is from the last
challenge on the exercise sheet which did not involve much besides seeing how the
server works and how modularizing JavaScript works with a quick test of the provided
web pack. Therefore, I will not include it in project status section.

#### Project status
- 'js_exercises_period2' = completed
- 'Javascript challenges' = completed


## Wednesday
Worked on 1 project: 'ajax_fetch_dom_manipulation'. I spent this day familiarizing myself
with the web pack we were introduced to on Tuesday, and worked my way through the exercises
for the day which involved setting up the project itself and a preconfigured server with a user 
API ('code_jsonserver_with_errors') so I could start fetching data from it with the main project.
All exercises have been completed.

#### Project status
- 'ajax_fetch_dom_manipulation' = completed

## Thursday
Worked on 1 project: 'person_client'. I spent this day going through the exercises of the final
part of the 4-part exercise. The first 3 parts involved setting up an API with a person database 
(with entity classes,rest endpoints etc) which we did last week (flow 2, week 1) and the final
part involved creating JavaScript front-end with the newly introduced web pack that could communicate
with our API through fetch calls of various types (GET, POST, PUT, DELETE).

I eventually went on to deploy my back-end from week 1 on my droplet (on my tomcat server), and later 
my front-end JavaScript on the Nginx server located on my droplet as well. A link to the end product
can be found above in the 'Notes' section.

#### Project status
- 'person_client' = completed

## Friday
Worked on 2 projects: 'country_map' and 'country_java'. Both of these were part of the same optional
exercise, which involved first using an svg file containing various country codes and an actual map
(image) of various countries to set up a web page where you can click on a country and get information
about it from a provided REST API containing lots of information about each country, as well as highlighting 
the selected country when clicked.

The 'country_java' project was created for part 3 of this exercise, which involved setting up a servlet
which could serve as a proxy between the provided API and our local server when fetching country data.

Finally, the 'Country general questions.docx' file contains my answers to the general questions asked
in the exercise sheet (at the top of it). 

#### Project status
- 'country_map' = completed
- 'country_java' = completed
