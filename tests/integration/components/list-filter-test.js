import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: "Seattle"}];
const FILTERED_ITEMS = [{city: 'Portland'}];

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

test('should initially load all listings', function (assert) {
    // we want our actions to return promises, since they are
    // potentially fetching data asynchronously.
    // add a function called 'filterByCity' to local test scope
    this.on('filterByCity', () => {
        return RSVP.resolve({ results: ITEMS });
    });

    // integration tests set up and use components in the same way that users
    // of the application will
    this.render(hbs`
        {{#list-filter filter=(action 'filterByCity') as |results|}}
            <ul>
                {{#each results as |item|}}
                    <li class="city">
                        {{item.city}}
                    </li>
                {{/each}}
            </ul>
        {{/list-filter}}
    `);

    return wait().then(() => {
        assert.equal(this.$('.city').length, 3);
        assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
    });
});

test('should update with matching listings', function (assert) {
    this.on('filterByCity', (val) => {
        if ( val === '' ) {
            return RSVP.resolve({
                query: val,
                results: ITEMS
            });
        } else {
            return RSVP.resolve({
                query: val,
                results: FILTERED_ITEMS
            });
        }
    });

    this.render(hbs`
        {{#list-filter filter=(action 'filterByCity') as |results|}}
            <ul>
                {{#each results as |item|}}
                    <li class="city">
                        {{item.city}}
                    </li>
                {{/each}}
            </ul>
        {{/list-filter}}
    `);

    // The keyup event here should invoke an action that will cause the list
    // to be filtered
    this.$('.list-filter input').val('San').keyup();

    return wait().then(() => {
        assert.equal(this.$('.city').length, 1);
        assert.equal(this.$('.city').first().text().trim(), 'Portland');
    });
});
