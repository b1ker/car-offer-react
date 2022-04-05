import PropTypes from 'prop-types';

const CountHeader = ({ count, type }) => {
  CountHeader.propTypes = {
    count: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  };

  return (
    <header className="p-2 text-end h5" testid={`${type}-label`}>
      {`WMI Data - Honda | ${type.charAt(0).toUpperCase() + type.slice(1)}: `}
      {count}
    </header>
  );
};
export default CountHeader;
