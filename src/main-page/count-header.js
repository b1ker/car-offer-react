import PropTypes from 'prop-types';

const CountHeader = ({ count, type }) => {
  CountHeader.propTypes = {
    count: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  };

  return (
    <header className="p-2 text-end h5" testid="total-label">
      {type === 'total' ? 'WMI Data - Honda | Total: ' : 'WMI Data - Honda | Count: '} {count}
    </header>
  );
};
export default CountHeader;
