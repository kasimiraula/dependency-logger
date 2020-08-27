
## Dependency inspector
This is a Python Flask application that shows package dependencies through HTML pages. The content is generated from */var/lib/dpkg/status* file found in Debian and Ubuntu systems. A demo version of the application is running in https://dependency-inspector.herokuapp.com/

### Running the application locally
  - Download the project and make sure you have Python>=3.7 installed locally. It is recommended that you create a specific python (or conda) environment before following to the next step. Read more about python environments here https://docs.python.org/3/library/venv.html
  - After creating and activating an environment for the project (or deciding not to do so) navigate to the project root and run 
  ```pip install --trusted-host pypi.python.org -r requirements.txt``` 
  which will download the required Python packages.
  - (**Optional**: either use the sample file downloaded with the project or copy your personal /var/lib/dpkg/status file under `static/`. Be sure to update the `INPUT_FILE` variable in `.env` file to match yur filename, if you change the copied filename to something else than `status`.)
  - Now you're ready to run the application. Start it with `python wsgi.py` and navigate with a browser to the address printed in terminal. 
