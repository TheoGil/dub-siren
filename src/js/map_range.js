function map_range(value, min_input, max_input, min_output, max_output) {
    value = (value - min_input) / (max_input - min_input);
    return min_output + value * (max_output - min_output);
}

export default map_range;