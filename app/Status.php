<?php

namespace App;

enum Status: string
{
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';
     case Suspended = 'suspended';
     case qualified = 'qualified';
    case Disqualified = 'disqualified';
    case Active = 'active';
    case Inactive = 'inactive';
  
}
