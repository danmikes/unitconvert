function inputSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g) || [""];

  return [number[0], string[0]];
}

function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result = inputSplitter(input)[0];
    let nums = checkDiv(result);

    if (!nums) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    result = Number(num1 / num2);

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    return result;
  };
  
  this.getUnit = function (input) {
    let result = inputSplitter(input)[1].toLowerCase();

    switch (result) {
      case "gal":
      case "kg":
      case "km":
      case "lbs":
      case "mi":
        return result;
      case "l":
        return "L";
      default:
        return undefined;
    }
  };
  
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      default:
        result = "ignorant";
        break;
    }

    return Number(result.toFixed(5));
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    
    switch (result) {
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "gal":
        return "L";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (initUnit) {
    let unit = initUnit.toLowerCase();
    
    switch (unit) {
      case "kg":
        return "kilograms";
      case "lbs":
        return "pounds";
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "gal":
        return "gallons";
      default:
        return "ignoro";
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
