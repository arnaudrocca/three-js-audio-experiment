const numberUtils = {

    normalize(num, min1, max1, min2, max2) {

        let num1 = (num - min1) / (max1 - min1);
        let num2 = (num1 * (max2 - min2)) + min2;

        return num2;

    },

    toRadians(degree) {

        return degree * (Math.PI / 180);

    },

    toDegree(radians) {

        return radians * (180 / Math.PI);

    }

};

export default numberUtils
