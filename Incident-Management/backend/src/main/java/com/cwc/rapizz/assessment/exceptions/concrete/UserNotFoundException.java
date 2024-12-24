package com.cwc.rapizz.assessment.exceptions.concrete;

public class UserNotFoundException extends RuntimeException{

    public UserNotFoundException(String msg){
        super(msg);
    }
}
