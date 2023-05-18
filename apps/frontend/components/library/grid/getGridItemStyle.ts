import {GridSize} from "@material-ui/core";

export const getGridItemStyle = (width: GridSize) => ({
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: width === 8 ? '#f2f2f2' : '#fff',
});
