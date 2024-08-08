#!/usr/bin/python3
""" Starts a Flask Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template, request, jsonify
import uuid
import logging

app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True

logging.basicConfig(level=logging.DEBUG)

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

@app.route('/1-hbnb/', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    cache_id = uuid.uuid4()
    
    return render_template('1-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)

@app.route('/search', methods=['POST'])
def search():
    """ Handle search request """
    data = request.get_json()
    logging.debug(f"Received data: {data}")
    amenities = data.get('amenities', [])
    places = storage.all(Place).values()
    filtered_places = []
    for place in places:
        if all(amenity_id in [a.id for a in place.amenities] for amenity_id in amenities):
            filtered_places.append({
                'name': place.name,
                'price_by_night': place.price_by_night,
                'max_guest': place.max_guest,
                'number_rooms': place.number_rooms,
                'number_bathrooms': place.number_bathrooms,
                'owner': f'{place.user.first_name} {place.user.last_name}',
                'description': place.description
            })
    logging.debug(f"Filtered places: {filtered_places}")
    return jsonify({'places': filtered_places})

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
