using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessageWall.Hubs
{
    [HubName("messageWall")]
    public class MessageWallHub : Hub
    {
    }
}