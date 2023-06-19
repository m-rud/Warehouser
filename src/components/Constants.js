const Constants = {
    "walls" : [[2,7],[2,8],[2,10],[2,11],
    [10,7],[10,8],[10,10],[10,11],
    [13,7],[13,8],[13,10],[13,11],
    [21,7],[21,8],[21,10],[21,11],
    [27,7],[27,8],[27,10],[27,11],
    [1,13],[2,13],[3,13],[4,13],[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],
    [13,13],[14,13],[15,13],[16,13],[17,13],[18,13],
    [3,15],[4,15],[6,15],[7,15],[9,15],[10,15],
    [1,23],[2,23],[3,23],[4,23],[5,23],[6,23],[7,23],[8,23],[9,23],[10,23],
    [19,7],[19,8],[19,9],[19,10],[19,11],[19,12],[19,13],
    [13,21],[14,21],[16,21],[17,21],
    [13,23],[14,23],[15,23],[16,23],[17,23],[18,23],[19,23],[19,22],[19,21],[19,20],[19,19],[19,18],[19,17],[19,16],[19,15],[19,14],
    [21,13],[22,13],[23,13],[24,13],[25,13],[26,13],[27,13],
    [20,23],[21,23],[22,23],[23,23],[25,23],[26,23],[27,23],[28,23],
    [21,21],[22,21],[27,21],[26,21],
    [10,25],[10,26],[10,27],[10,28],[10,29],[10,30],[10,31],[11,31],[12,31],[13,31],[14,31],[15,31],[16,31],[17,31],[18,31],[20,31],[21,31],[22,31],[23,31],[24,31],[25,31],[26,31],[27,31],[28,31],
    [26,25],[26,29],[25,29],[25,25],[23,25],[23,29],[22,29],[22,25],[20,29],[19,29],[19,25],[20,25],[17,25],[16,25],[16,29],[17,29],[14,29],[13,29],[13,25],[14,25],
    [8,28],[8,29],[8,31],[8,32],[8,34],[8,35],[7,35],[6,35],[5,35],[4,35],[3,35],[2,35],[2,34],
    [2,37],[3,37],[2,47],[3,47],[5,37],[6,37],[5,47],[6,47],[8,48],[8,47],[8,46],[8,45],[8,44],[8,43],[8,42],[8,41],[8,40],[8,39],[8,38],[8,37],
    [10,33],[10,34],[10,36],[10,37],[10,39],[10,40],[10,42],[10,43],[10,45],[10,46],[18,33],[18,34],[18,36],[18,37],[18,39],[18,40],[18,42],[18,43],[18,45],[18,46],
    [20,33],[20,34],[20,36],[20,37],[20,39],[20,40],[20,42],[20,43],[20,45],[20,46]
],

    "shelfs" : [[3,7],[4,7],[5,7],[6,7],[7,7],[8,7],[9,7],
    [14,7],[15,7],[16,7], [17,7], [18,7],
    [22,7],[23,7],[24,7],[25,7],[26,7],
    [3,8],[4,8],[5,8],[6,8],[7,8],[8,8],[9,8],
    [14,8],[15,8],[16,8], [17,8], [18,8],
    [22,8],[23,8],[24,8],[25,8],[26,8],
    [3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],
    [14,10],[15,10],[16,10], [17,10], [18,10],
    [22,10],[23,10],[24,10],[25,10],[26,10],
    [3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],
    [14,11],[15,11],[16,11], [17,11], [18,11],
    [22,11],[23,11],[24,11],[25,11],[26,11],
    [1,14],[1,15],[1,16],[1,17],[1,18],[1,19],[1,20],[1,21],[1,22],
    [3,16],[3,17],[3,18],[3,19],[3,20],[3,21],[3,22],
    [4,16],[4,17],[4,18],[4,19],[4,20],[4,21],[4,22],
    [6,16],[6,17],[6,18],[6,20],[6,19],[6,21],[6,22],
    [7,22],[7,21],[7,20],[7,19],[7,18],[7,17],[7,16],
    [9,16],[9,17],[9,18],[9,19],[9,20],[9,21],[9,22],
    [10,22],[10,21],[10,19],[10,18],[10,20],[10,17],[10,16],
    [13,14],[13,15],[13,16],[13,17],[13,18],[13,19],[13,20],
    [14,20],[14,19],[14,18],[14,17],[14,16],[14,15],[14,14],
    [16,14],[16,15],[16,16],[16,17],[16,18],[16,19],[16,20],
    [17,20],[17,19],[17,18],[17,17],[17,16],[17,15],[17,14],
    [21,14],[21,15],[21,16],[21,17],[21,18],[21,19],[21,20],
    [22,20],[22,19],[22,18],[22,17],[22,16],[22,15],[22,14],
    [26,14],[26,15],[26,16],[26,17],[26,18],[26,19],[26,20],
    [27,20],[27,18],[27,19],[27,17],[27,16],[27,15],[27,14],
    [9,25],[9,26],[8,26],[8,25],[7,25],[7,26],[6,26],[6,25],
    [5,25],[5,26],[4,26],[4,25],[3,25],[3,26],[2,26],[2,25],[1,25],[1,26],
    [13,26],[13,27],[13,28],[14,28],[14,27],[14,26],
    [16,26],[16,27],[17,28],[16,28],[17,27],[17,26],
    [19,26],[19,27],[19,28],[20,28],[20,27],[20,26],
    [22,26],[22,27],[22,28],[23,28],[23,27],[23,26],
    [25,26],[25,27],[25,28],[26,28],[26,27],[26,26],
    [28,24],[28,25],[28,26],[28,27],[28,28],[28,29],[28,30],
    [7,28],[6,28],[5,28],[4,28],[3,28],[2,28],[1,28],
    [1,29],[2,29],[3,29],[4,29],[5,29],[6,29],[7,29],
    [7,31],[6,31],[5,31],[4,31],[3,31],[2,31],[1,31],
    [1,32],[2,32],[3,32],[4,32],[5,32],[6,32],[7,32],
    [7,34],[6,34],[5,34],[4,34],[3,34],
    [2,38],[2,39],[2,40],[2,41],[2,42],[2,43],[2,44],[2,45],[2,46],
    [3,46],[3,45],[3,44],[3,43],[3,42],[3,41],[3,40],[3,39],[3,38],
    [5,38],[5,39],[5,40],[5,41],[5,42],[5,43],[5,44],[5,45],[5,46],
    [6,46],[6,45],[6,44],[6,43],[6,42],[6,41],[6,40],[6,39],[6,38],
    [11,33],[12,33],[13,33],[14,33],[15,33],[16,33],[17,33],
    [17,34],[16,34],[15,34],[14,34],[13,34],[12,34],[11,34],
    [11,36],[12,36],[13,36],[14,36],[15,36],[16,36],[17,36],
    [17,37],[16,37],[15,37],[14,37],[13,37],[12,37],[11,37],
    [11,39],[12,39],[13,39],[14,39],[15,39],[16,39],[17,39],
    [17,40],[16,40],[15,40],[14,40],[13,40],[12,40],[11,40],
    [11,42],[12,42],[13,42],[14,42],[15,42],[16,42],[17,42],
    [17,43],[16,43],[15,43],[14,43],[13,43],[12,43],[11,43],
    [11,45],[12,45],[13,45],[14,45],[15,45],[16,45],[17,45],
    [17,46],[16,46],[15,46],[14,46],[13,46],[12,46],[11,46],
    [21,33],[22,33],[23,33],[24,33],[25,33],[26,33],[27,33],
    [28,33],[28,34],[27,34],[26,34],[25,34],[24,34],[23,34],
    [22,34],[21,34],[21,36],[22,36],[23,36],[24,36],[25,36],
    [26,36],[27,36],[28,36],[28,37],[27,37],[26,37],[25,37],
    [24,37],[23,37],[22,37],[21,37],[21,39],[22,39],[23,39],
    [24,39],[25,39],[26,39],[27,39],[28,39],[28,40],[27,40],
    [26,40],[25,40],[24,40],[23,40],[22,40],[21,40],[21,42],
    [22,42],[23,42],[24,42],[25,42],[26,42],[27,42],[28,42],
    [28,43],[27,43],[26,43],[25,43],[24,43],[23,43],[22,43],
    [21,43],[21,45],[22,45],[23,45],[24,45],[25,45],[26,45],
    [27,45],[28,45],[28,46],[27,46],[26,46],[25,46],[24,46],
    [23,46],[22,46],[21,46],
    [9,48],[10,48],[11,48],[12,48],[13,48],[14,48],[15,48],[16,48],[17,48],[18,48],[19,48],[20,48],[21,48],[22,48],[23,48],[24,48],[26,48],[25,48],[27,48],[28,48]
]
}

export default Constants;

