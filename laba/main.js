function triangle(value1, type1, value2, type2) {
    
    
    if (value1 <= 0 || value2 <= 0) {
        console.log('Значення аргументів повинні бути додатніми.');
        return "failed";
    }
    
    let a, b, c, alpha, beta;

    
    if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        
        if (type1 === "leg") {
            a = value1;
            c = value2;
        } else {
            a = value2;
            c = value1;
        }

        
        if (c <= a) {
            console.log('Гіпотенуза має бути більшою за катет.');
            return "failed";
        }
        
        b = Math.sqrt(c ** 2 - a ** 2);
        alpha = Math.asin(a / c);
        beta = Math.acos(a / c);
        
    } else if ((type1 === "leg" && type2 === "angle") || (type1 === "angle" && type2 === "leg")) {
        
        let leg, angle;

        if (type1 === "leg") {
            leg = value1;
            angle = value2;
        } else {
            leg = value2;
            angle = value1;
        }

      
        if (angle <= 0 || angle >= 90) {
            console.log('Кут має бути гострим (менше 90 градусів).');
            return "failed";
        }

        
        angle = angle * (Math.PI / 180);

        
        if (type1 === "leg" && type2 === "angle") {
            a = leg;
            alpha = angle;
            b = a * Math.tan(alpha);
            c = a / Math.sin(alpha);
        } else {
            b = leg;
            alpha = angle;
            a = b / Math.tan(alpha);
            c = b / Math.sin(alpha);
        }
        
        
        beta = Math.acos(a / c);
        
    } else if ((type1 === "hypotenuse" && type2 === "angle") || (type1 === "angle" && type2 === "hypotenuse")) {
        
        let hypotenuse, angle;

        if (type1 === "hypotenuse") {
            hypotenuse = value1;
            angle = value2;
        } else {
            hypotenuse = value2;
            angle = value1;
        }

        
        if (angle <= 0 || angle >= 90) {
            console.log('Кут має бути гострим (менше 90 градусів).');
            return "failed";
        }

        
        angle = angle * (Math.PI / 180);

        
        c = hypotenuse;
        a = c * Math.cos(angle);
        b = c * Math.sin(angle);

       
        alpha = angle;
        beta = Math.acos(a / c);
        
    } else if ((type1 === "opposite angle" && type2 === "leg") || (type1 === "leg" && type2 === "opposite angle")) {
        
        let oppositeAngle, leg;

        if (type1 === "opposite angle") {
            oppositeAngle = value1;
            leg = value2;
        } else {
            oppositeAngle = value2;
            leg = value1;
        }


        if (oppositeAngle <= 0 || oppositeAngle >= 90) {
            console.log('Кут має бути гострим (менше 90 градусів).');
            return "failed";
        }

        oppositeAngle = oppositeAngle * (Math.PI / 180);

 
        a = leg;
        alpha = oppositeAngle;
        b = a * Math.tan(alpha);
        c = a / Math.sin(alpha);
        
    
        beta = Math.acos(a / c);
    } else {
        console.log('Некоректна комбінація аргументів.');
        return "failed";
    }

  
    console.log(`a = ${a.toFixed(2)}`);
    console.log(`b = ${b.toFixed(2)}`);
    console.log(`c = ${c.toFixed(2)}`);
    console.log(`alpha = ${(alpha * (180 / Math.PI)).toFixed(2)} градусів`);
    console.log(`beta = ${(beta * (180 / Math.PI)).toFixed(2)} градусів`);
    

    console.log("'success'");
    return "success";
}
triangle(3, "leg", 60, "angle");
triangle(8, "leg", 90, "angle");
triangle(10, 'leg', 5, 'hypotenuse');