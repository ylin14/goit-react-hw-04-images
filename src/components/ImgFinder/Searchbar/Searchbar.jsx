import {useState } from 'react';
import PropTypes from 'prop-types';

import s from './searchbar.module.css';

function Searchbar ({ onSubmit }) {
  const [query, setQuery] = useState('')
  const onChange = ({ target }) => {
    const { value } = target;
    setQuery(value);
  };

  const getQuery = e => {
    e.preventDefault();
    if (!query.trim().length) {
      return alert("Не можна зробити запит по пустій квері")
    }

    onSubmit(query)

    setQuery('');

  }

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={getQuery}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          name="query"
          value={query}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
          required
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
