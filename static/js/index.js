const socketio = io();
const btnProcess = document.querySelector('#btn-process')
M.FormSelect.init(document.querySelectorAll('select'));

btnProcess.addEventListener('click', (e) => {
    e.preventDefault();
    socketio.emit('message-client', {some_data: 5});
});

socketio.on('message-server', (data) => {
    console.log(data);
});

Plotly.newPlot('chart1', [{
    x: [1, 2, 3, 4],
    y: [1, 4, 6, 8],
    mode: 'lines+markers'
}]);


