import React from 'react';
import { Table } from 'react-bootstrap';
import _get from 'lodash.get';

/**
 * @template T
 * @typedef SortTableProps
 * @property {Array<T>} data
 */

/**
 * @typedef SortTableColProps
 * @property {string|null} heading
 * @property {string|null|false} sort
 */

/**
 * @template T
 * @extends {React.Component<SortTableProps<T>>}
 */
class SortTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sort: null };
    this.arrayWrapChildren = this.arrayWrapChildren.bind(this);
    this.craftOnClick = this.craftOnClick.bind(this);
    this.setSort = this.setSort.bind(this);
    this.header = this.header.bind(this);
    this.sortedData = this.sortedData.bind(this);
  }

  arrayWrapChildren() {
    if (this.props.children === undefined) {
      return [];
    } else if (Array.isArray(this.props.children)) {
      return this.props.children;
    } else {
      return [this.props.children];
    }
  }

  setSort(sort) {
    if (sort !== this.state.sort) {
      this.setState({ sort });
    }
  }

  craftOnClick(sort) {
    return sort ? () => this.setSort(sort) : null;
  }

  header(child, key) {
    if (!child) return null;
    const sort = child.props.sort;
    return sort ? (
      <th key={key} onClick={this.craftOnClick(sort)}>
        {child.props.heading}{sort === this.state.sort ? '*' : null}
      </th>
    ) : (
      <th key={key}>{child.props.heading}</th>
    );
  }

  cell(child, data, key) {
    if (!child) return null;
    const cb = child.props.children;
    const inner = typeof cb === 'function' ? cb(data) : data;
    return <td key={key}>{inner}</td>;
  }

  /** @param {T[]} data */
  sortedData() {
    const sort = this.state.sort;
    if (sort === null) {
      return this.props.data;
    }

    return this.props.data.sort((a, b) => {
      a = _get(a, sort, a);
      b = _get(b, sort, b);
      return (a < b) ? -1 : (a > b) ? 1 : 0
    });
  }

  render() {
    if (!Array.isArray(this.props.data)) {
      console.log('UWUWUWUWUWUUWUWWWU');
      return null;
    }

    const data = this.sortedData();
    const children = this.arrayWrapChildren();
    const headers = [];

    const rows = data.map((d, i) => {
      const cells = children.map((c, j) => {
        if (i === 0) {
          headers.push(this.header(c, `header#${j}`));
        }
        return this.cell(c, d, `cell#${i}:${j}`);
      });
      return <tr key={`row#${i}`}>{cells}</tr>;
    });

    return (
      <Table>
        <thead><tr>{headers}</tr></thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

/**
 * @extends {React.Component<SortTableColProps>}
 */
SortTable.Col = function() { return null; };

export default SortTable;
