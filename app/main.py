import os
import json
import numpy as np

from dotenv import load_dotenv
from flask import Flask, jsonify, request, render_template, redirect
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return redirect("/dependencies/")

@app.route('/dependencies/')
def getAll():
    input_file='static/status.real'
    #os.getenv('INPUT_FILE')
    reader=open('{}_formatted'.format(input_file), "r")
    dependencies=[json.loads(dependency) for dependency in reader.readlines()]
    #return jsonify({'data': packages})
    return render_template('all-dependencies.html', dependencies = dependencies)


@app.route('/dependencies/<dependency_name>', methods=["GET"])
def getOne(dependency_name):
    input_file='static/status.real'
    #os.getenv('INPUT_FILE')
    reader=open('{}_formatted'.format(input_file), "r")
    dependencies=reader.readlines()
    selected_dependency=[json.loads(dependency) for dependency in dependencies if json.loads(dependency)["Package"] == dependency_name]
    selected_dependency=selected_dependency[0]
    #package=[pack for pack in packages if pack['Package'] == package_name]
    #return jsonify({'data': selected_dependency})
    return render_template('single-dependency.html', dependency = selected_dependency)


def format_dependencies(filename, attributes=['Package', 'Description', 'Depends']):
    dependency_list=[]
    #filewriter=open('{}_formatted'.format(filename), "w")
    object={}
    with open(filename) as f:
        for line in f:
            fields = line.strip('\n').split(': ')
            if len(fields[0])==0:
                dependency_list.append(object)
                #filewriter.write(object)
                object={}
            elif fields[0]=='Depends':
                object_dependencies = fields[1].split(', ')
                object_dependencies = [o.split('|')[0].split('.^d')[0].split(' ')[0] for o in object_dependencies]
                object_dependencies = list(set(object_dependencies))
                object[fields[0]]=object_dependencies
            elif fields[0]=='Description' or fields[0]=='Package':
                object[fields[0]]=fields[1]
            else:
                #do nothing
                print('', end='\r')
    #filewriter.close()
    return dependency_list

def determine_reverse_dependencies(filename, dependency_list):
    filewriter=open('{}_formatted'.format(filename), "w")
    reverse_list=[]

    for package in dependency_list:
        for dependency in dependency_list:
            if ('Depends'==np.array(list(dependency.keys()))).any():
                if (package['Package']==np.array(dependency['Depends'])).sum()>0:
                    reverse_list.append(dependency['Package'])
        if len(reverse_list)>0:
            package['Reverse_dependencies']=reverse_list
            reverse_list=[]
    for d in dependency_list:
        filewriter.write(json.dumps(d)+'\n')
    filewriter.close()

    return reverse_list

if __name__ == '__main__':
    print("Backend starting")
    load_dotenv()
    #input_file = os.getenv('INPUT_FILE')
    input_file = 'static/status.real'
    print(os.path.isfile('{}_formatted'.format(input_file)))
    if not os.path.isfile('{}_formatted'.format(input_file)):
        print('formatted file not found. formatting input file...')
        dependencies = format_dependencies(input_file)
        print('\n Determining reverse dependencies..')
        dependencies = determine_reverse_dependencies(input_file, dependencies)
        print('Done')
    else:
        print("File already exists! Fetching to memory...")
        dependencies=[json.loads(dependency) for dependency in reader.readlines()]


    app.run()
