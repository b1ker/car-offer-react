import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import PropTypes from 'prop-types';

const VehicleTable = ({ vehicles }) => {
  VehicleTable.propTypes = {
    vehicles: PropTypes.array.isRequired
  };

  const columns = [
    { id: 'name', name: 'Name' },
    { id: 'wmi', name: 'WMI' },
    { id: 'country', name: 'Country' },
    { id: 'createdOn', name: 'Created on' },
    { id: 'vehicleType', name: 'Vehicle Type' }
  ];

  const getRows = (vehicles) => {
    return vehicles.map((d) => {
      const wmi = d.wmi;
      return (
        <tr key={wmi}>
          <td key={`"name-"${d.name}`}>{d['name']}</td>
          <td key={`"wmi-"${d.wmi}`}>{d['wmi']}</td>
          <td key={`"country-"${d.country}`}>{d['country']}</td>
          <td key={`"createdOn-"${d.createdOn}`}>
            {LocalDateTime.parse(d['createdOn']).format(DateTimeFormatter.ofPattern('yyyy-MM-dd'))}
          </td>
          <td key={`"vehicleType-"${d.vehicleType}`}>{d['vehicleType']}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="mt-3 table table-dark table-striped">
        <thead>
          <tr>
            {columns.map((k) => (
              <th key={k.id}>{k.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>{getRows(vehicles)}</tbody>
      </table>
    </div>
  );
};
export default VehicleTable;
