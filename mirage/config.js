export default function() {
    this.namespace = '/api';

    let rentals = [{
        type: 'rentals',
        id: 'grand-old-mansion',
        attributes: {
            title: 'Grand Old Mansion',
            owner: 'Veruca Salt',
            city: 'San Francisco',
            "property-type": 'Estate',
            bedrooms: 15,
            image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        }
    },
    {
        type: 'rentals',
        id: 'urban-living',
        attributes: {
            title: 'Urban Living',
            owner: 'Mike TV',
            city: 'Seattle',
            "property-type": 'Condo',
            bedrooms: 1,
            image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg',
        }
    },
    {
        type: 'rentals',
        id: 'downtown-charm',
        attributes: {
            title: 'Downtown Charm',
            owner: 'Violet Beauregarde',
            city: 'Portland',
            "property-type": 'Apartment',
            bedrooms: 3,
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg',
        }
    }];

    this.get('/rentals', function(db, request) {
        const city = request.queryParams.city;
        if ( city !== undefined ) {
            let filteredRentals = rentals.filter((i) => {
                return i.attributes.city.toLowerCase().indexOf(city.toLowerCase()) !== -1;
            })
            return { data: filteredRentals };
        }

        return { data: rentals };
    });
}
