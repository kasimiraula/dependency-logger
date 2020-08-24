FROM python:3.7-slim

WORKDIR /mydir

COPY . .

RUN pip install --upgrade pip

RUN pip install --trusted-host pypi.python.org -r requirements.txt

CMD ["python", "app.py"]
