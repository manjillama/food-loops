import { Checkbox, TextInput, TextArea } from '../form';
import NutrientsField from './NutrientsField';

const MenuForm = ({ formProps, setFormProps, handleSubmit }) => {
  const {
    isEnabled,
    name,
    description,
    price,
    servingSize,
    categories,
    nutrients,
  } = formProps;

  function handleChange(e) {
    let { name, type, checked, value, dataset } = e.currentTarget;

    if (name === 'categories') {
      // Update categories
      if (checked) value = [...formProps.categories, value];
      else value = formProps.categories.filter((c) => c !== value);
    } else if (name === 'nutrients') {
      // Update nutrients
      if (dataset.add) {
        const exist = formProps.nutrients.some((n) => n.name === dataset.name);
        if (exist)
          value = formProps.nutrients.map((n) => {
            if (n.name === dataset.name) n.amount = value;
            return n;
          });
        else
          value = [
            ...formProps.nutrients,
            { name: dataset.name, amount: value },
          ];
      } else value = formProps.nutrients.filter((n) => n.name !== dataset.name);
    } else if (type === 'checkbox') value = checked;

    setFormProps({
      ...formProps,
      [name]: value,
    });
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Checkbox
          onChange={handleChange}
          name="isEnabled"
          label="Enabled"
          id="inline-enabled"
          inline
          checked={isEnabled}
        />
        <hr />
        <TextInput
          onChange={handleChange}
          value={name}
          label="Dish Name"
          name="name"
        />
        <hr />
        <TextArea
          onChange={handleChange}
          value={description}
          label="Description"
          name="description"
        />
        <hr />
        <TextInput
          type="number"
          onChange={handleChange}
          value={price}
          label="Price (NPR.)"
          name="price"
        />
        <hr />
        <TextInput
          type="number"
          onChange={handleChange}
          value={servingSize}
          label="Serving size (Oz)"
          name="servingSize"
        />
        <hr />
        <div className="form-group">
          <div>
            <label>Categories</label>
          </div>
          {['Breakfast', 'Lunch', 'Dinner', 'Beverages'].map((c) => (
            <Checkbox
              key={c}
              inline
              onChange={handleChange}
              name="categories"
              label={c}
              id={`inline-${c}`}
              value={c}
              checked={categories.includes(c)}
            />
          ))}
        </div>
        <hr />
        <NutrientsField
          nutrients={nutrients}
          handlePropsChange={handleChange}
        />
        <hr />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
};

export default MenuForm;
