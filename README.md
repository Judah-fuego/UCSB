Gaucho Grubs

The best UCSB dining hall app!

**Inspiration**

Waiting in long lines for the dining hall is frustrating, and one method that UCSB provides to solve this problem is offering live feed of the lines outside the dining hall. However, this does not provide an accurate measure of wait times, which reduces its utility. Furthermore, searching through all the menu items to determine which dining hall’s options caters to preferences and dietary restrictions is time consuming.

**What it does**

Gaucho Grub utilizes computer vision to detect the number of people in line outside the dining hall in real time. Using this information, it predicts the waiting time of any given dining hall at UCSB. To further its utility, it also filters menu options based on dietary restrictions and preferences, such as vegan or vegetarian, as well as allergens, ensuring that the options present are tailored to the student. An AI Chatbot is also included, where students can ask about current menu details and recommendations at the different dining halls. This helps students waste less time in line and make their trips to the dining hall more worthwhile.

**How we built it**

We utilized the UCSB Dining Cam API for the live video feed, and analyzed the data using Yolo V3, detecting the number of people in line. From there, we were able to simply calculate the estimated wait time based on the average time one person contributes to the wait. Adding in the menu options, we scraped the dining hall website for daily menu and stored it in a postgres database. Then, to connect the front end with the database we used Python Flask. We created multiple Rest APIs to personally tailor the information to each user. Finally, we built the front end using React Native for mobile deployment. Our cherry on top was adding a chatbot which incorporated Langchain to recommend menu items and restaurants for user queries. We stored the queries for later data analysis so the Universities can better know what menu items are popular.

**Challenges we ran into**

Some challenges we faced were an unfamiliarity with front end app development in React Native and we came across Git issues which were a result of lack of communication.

**Accomplishments that we're proud of**

We are proud of your simple yet powerful idea to utilize publicly available data to produce a quantitative solution to what currently only has a qualitative answer. We also are proud of turning around our project quickly, abandoning our original idea early on for the better idea and learning a lot along the way.

**What we learned**

We learned how to use AI tools, such as Yolo V3 and Langchain, to analyze data from the video feed. We worked with Python Flask Rest APIs for the first time as well as using Reactive Native to create an app with no experience. Finally, we learned how to collaborate as a team using Git and how to delegate tasks.

**What's next for Gaucho Grub**

Gathering further data, we will improve on the accuracy of our wait time calculations by fine tuning the model weights using the data. The model we currently use is a pre-trained model, explorations with fine tuning based on the UCSB dining commons live video data has yet to be explored. We would like to include nutrition info, and with this menu data, a recommender system could also be implemented that learns user preferences based on items that they favor. We could apply this application framework library queues, as the data is readily available. We also gather data on Chatbot queries to determine what items and categories are popular which we can provide to the University for their use.
