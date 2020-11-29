// This is not part of the REST API. This code belongs to the database.

exports = function () {
  const collection = context.services
    .get("Cluster0")
    .db("autoPayDB")
    .collection("loan");

  return collection
    .find({})
    .toArray()
    .then((users) => {
      users.forEach((user) => {
        const difference = getDifference(user.due);
        if (user.status === "due" && difference < 49) {
          const message = getMessage(user, difference);
          notify(user, message);
        }
      });
    });
};

function getDifference(timestamp) {
  const now = new Date();
  const due = new Date(timestamp);
  const difference = due.getTime() - now.getTime();
  const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  return hoursDifference;
}

function getMessage(user, hours) {
  const dueDate = new Date(user.due);
  if (hours <= 48 && hours > 0) {
    const message = `Hii ${user.userName}! You have a upcoming due of amount Rs.${user.dueAmount}. Pay the amount on or before ${dueDate} to avoid any extra charges. Click here to pay : https://razorpay.com/upi/ . Note: DO NOT REPLY - this message is automated`;
    return message;
  } else if (hours <= 0 && hours > -240) {
    const days = -1 * (hours / 24);
    updateFine(user, days);
    const dueAmount = user.dueAmount + days * 10;
    const message = `Hii ${
      user.userName
    }! WARNING: You have missed a due on ${dueDate}. You have to pay a total of Rs.${dueAmount} (Split : ${
      user.dueAmount
    } + fine: ${
      days * 100
    } ). Pay immediately to avoid extra charges. Click here to pay : https://razorpay.com/upi/ . Note: DO NOT REPLY - this message is automated.`;
    return message;
  } else if (hours < -240) {
    const days = -1 * (hours / 24);
    updateFine(user, days);
    const dueAmount = user.dueAmount + days * 10;
    const message = `Hii ${
      user.userName
    }! WARNING: Your due is past 10 days. You have to pay a total of Rs.${dueAmount} (Split : ${
      user.dueAmount
    } + fine: ${
      days * 100
    } ). Our manager will be calling you to sort out any issues. Click here to pay : https://razorpay.com/upi/ . Note: DO NOT REPLY - this message is automated.`;
    const managerMsg = `The user ${user.userName} hasn't paid due over 10 days.`;
    notifyManager(managerMsg);
    return message;
  }
}

function updateFine(user, days) {
  const collection = context.services
    .get("Cluster0")
    .db("autoPayDB")
    .collection("loan");
  collection.updateOne({ phone: user.phone }, { $set: { fine: days * 100 } });
}

function notify(user, message) {
  const twilio = context.services.get("twilio");
  twilio.send({
    to: user.phone,
    from: "+15633879711",
    body: message,
  });

  const res = context.http.post({
    url: "https://pay-reminder.herokuapp.com/message",
    body: { message: message, phone: user.phone },
    encodeBodyAsJSON: true,
  });

  const mailRes = context.http.post({
    url: "https://pay-reminder.herokuapp.com/mail",
    body: { message: message, email: user.email },
    encodeBodyAsJSON: true,
  });
}

function notifyManager(message) {
  const mailRes = context.http.post({
    url: "https://pay-reminder.herokuapp.com/mail",
    body: { message: message, email: "arjun.17cs@kct.ac.in" },
    encodeBodyAsJSON: true,
  });
}
