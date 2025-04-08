import React from 'react';
import './SeatMap.css';

const SeatMap = ({ totalSeats, reservedSeats, selectedSeat, onSeatSelect }) => {
    const rows = Math.ceil(totalSeats / 6); // 6 assentos por fileira (3-3)
    
    const getSeatNumber = (row, position) => {
        const seatNumber = (row * 6) + position + 1;
        return seatNumber <= totalSeats ? seatNumber : null;
    };

    const getSeatLetter = (position) => {
        return ['A', 'B', 'C', 'D', 'E', 'F'][position];
    };

    const isSeatReserved = (row, position) => {
        const seatNumber = `${row + 1}${getSeatLetter(position)}`;
        return reservedSeats.includes(seatNumber);
    };

    const handleSeatClick = (row, position) => {
        const seatNumber = `${row + 1}${getSeatLetter(position)}`;
        if (!isSeatReserved(row, position)) {
            onSeatSelect(seatNumber);
        }
    };

    return (
        <div className="seat-map">
            <div className="seat-map-header">
                <span>Janela</span>
                <span>Corredor</span>
                <span>Corredor</span>
                <span>Janela</span>
            </div>
            {Array(rows).fill(null).map((_, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                    <div className="row-number">{rowIndex + 1}</div>
                    {Array(6).fill(null).map((_, position) => {
                        const seatNumber = getSeatNumber(rowIndex, position);
                        if (!seatNumber) return null;

                        const seatId = `${rowIndex + 1}${getSeatLetter(position)}`;
                        const isReserved = isSeatReserved(rowIndex, position);
                        const isSelected = selectedSeat === seatId;

                        return (
                            <React.Fragment key={position}>
                                {position === 3 && <div className="seat-gap" />}
                                <button
                                    className={`seat ${isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
                                    onClick={() => handleSeatClick(rowIndex, position)}
                                    disabled={isReserved}
                                    title={`Assento ${seatId}`}
                                >
                                    {seatId}
                                </button>
                            </React.Fragment>
                        );
                    })}
                </div>
            ))}
            <div className="seat-map-legend">
                <div className="legend-item">
                    <div className="seat-sample" />
                    <span>Disponível</span>
                </div>
                <div className="legend-item">
                    <div className="seat-sample reserved" />
                    <span>Ocupado</span>
                </div>
                <div className="legend-item">
                    <div className="seat-sample selected" />
                    <span>Selecionado</span>
                </div>
            </div>
        </div>
    );
};

export default SeatMap;
