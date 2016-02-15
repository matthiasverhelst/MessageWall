using MessageWall.Hubs;
using MessageWall.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace MessageWall.Controllers
{
    public class MessageWallController : ApiControllerWithHub<MessageWallHub>
    {
        /**
         * URL: /api/MessageWall        (POST request)
         */
        public string PostMessage(MessageModel message)
        {
            var nameEntry = "Name: " + message.UserName;
            var messageEntry = "Message: " + message.MessageText;
            var separator = "---------------";
            var entry = new string[] { nameEntry, messageEntry, separator };

            var filePath = "D:/message-wall.txt";

            File.AppendAllLines(filePath, entry);

            Hub.Clients.All.broadcastMessage(message.UserName, message.MessageText);

            return "success";
        }
    }
}