<?php

namespace App;

enum ElectionsStatus : string
{


    case Inactive = 'inactive';
    case Upcoming = 'upcoming';
    case Ongoing = 'ongoing';
    case Finished = 'finished';  
    case Cancelled = 'cancelled';

}
